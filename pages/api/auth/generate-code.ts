import type { NextApiRequest, NextApiResponse } from 'next';
import { randomString } from 'utils/tools';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }
  const data = req.body;
  const { password } = data;

  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(422).json({ error: 'the password is error' });
    return;
  }

  process.env.ACCESS_CODE = randomString();
  const code = process.env.ACCESS_CODE;

  res.status(201).json({
    message: 'Generated code!',
    data: { code: code },
  });
}

export default handler;
