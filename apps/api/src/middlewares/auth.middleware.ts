import { Request, Response, NextFunction } from 'express';
import { auth } from '../lib/auth';
import { fromNodeHeaders } from 'better-auth/node';

// Extend Express Request to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
            };
        }
    }
}

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (!session || !session.user) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized - Please login to continue',
            });
        }

        req.user = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
        };

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            success: false,
            error: 'Unauthorized - Invalid session',
        });
    }
}

// Optional auth - doesn't fail if no session
export async function optionalAuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (session && session.user) {
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
            };
        }

        next();
    } catch (error) {
        // Continue without user
        next();
    }
}
