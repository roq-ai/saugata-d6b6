import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { riderValidationSchema } from 'validationSchema/riders';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.rider
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getRiderById();
    case 'PUT':
      return updateRiderById();
    case 'DELETE':
      return deleteRiderById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRiderById() {
    const data = await prisma.rider.findFirst(convertQueryToPrismaUtil(req.query, 'rider'));
    return res.status(200).json(data);
  }

  async function updateRiderById() {
    await riderValidationSchema.validate(req.body);
    const data = await prisma.rider.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteRiderById() {
    const data = await prisma.rider.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
