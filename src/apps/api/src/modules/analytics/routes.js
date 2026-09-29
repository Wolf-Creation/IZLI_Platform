import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { AnalyticEvent } from './model.js';

export const analyticsRoutes = Router();

analyticsRoutes.post('/events', async (request, response, next) => {
	try {
		const { event, page, visitorId, sessionId, referrer, device, cta } = request.body ?? {};
		if (!['page_view', 'cta_click'].includes(event) || typeof page !== 'string' || !page.startsWith('/')) {
			return response.status(400).json({ success: false, message: 'A valid analytics event is required' });
		}

		await AnalyticEvent.create({
			event,
			domain: 'content',
			actorType: 'anonymous',
			ip: request.ip,
			userAgent: request.get('user-agent'),
			meta: {
				page,
				visitorId: typeof visitorId === 'string' ? visitorId.slice(0, 100) : undefined,
				sessionId: typeof sessionId === 'string' ? sessionId.slice(0, 100) : undefined,
				referrer: typeof referrer === 'string' ? referrer.slice(0, 500) : undefined,
				device: typeof device === 'string' ? device.slice(0, 40) : undefined,
				cta: typeof cta === 'string' ? cta.slice(0, 120) : undefined,
			},
		});

		return response.status(202).json({ success: true, message: 'Analytics event accepted', data: null });
	} catch (error) {
		return next(error);
	}
});

analyticsRoutes.get('/overview', authMiddleware, async (request, response, next) => {
	try {
		if (!['admin', 'owner', 'editor'].includes(request.user?.role)) {
			return response.status(403).json({ success: false, message: 'Analytics access is restricted to staff users' });
		}

		const days = Math.min(Math.max(Number(request.query.days) || 30, 1), 365);
		const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
		const events = await AnalyticEvent.find({ event: { $in: ['page_view', 'cta_click'] }, createdAt: { $gte: since } }).select('event meta createdAt').lean();
		const visitors = new Set();
		const sessions = new Set();
		const pages = new Map();
		const ctas = new Map();

		for (const item of events) {
			const meta = item.meta ?? {};
			if (meta.visitorId) visitors.add(String(meta.visitorId));
			if (meta.sessionId) sessions.add(String(meta.sessionId));
			if (item.event === 'page_view') {
				const page = String(meta.page ?? '/');
				pages.set(page, (pages.get(page) ?? 0) + 1);
			}
			if (item.event === 'cta_click' && meta.cta) {
				const key = `${meta.page ?? '/'}|${meta.cta}`;
				ctas.set(key, { page: String(meta.page ?? '/'), cta: String(meta.cta), clicks: (ctas.get(key)?.clicks ?? 0) + 1 });
			}
		}

		const topPages = [...pages.entries()]
			.map(([page, views]) => ({ page, views }))
			.sort((left, right) => right.views - left.views)
			.slice(0, 10);
		const topCtas = [...ctas.values()].sort((left, right) => right.clicks - left.clicks).slice(0, 10);

		return response.status(200).json({
			success: true,
			message: 'Visitor analytics retrieved successfully',
			data: { days, visitors: visitors.size, sessions: sessions.size, pageViews: events.filter(item => item.event === 'page_view').length, topPages, topCtas },
		});
	} catch (error) {
		return next(error);
	}
});

