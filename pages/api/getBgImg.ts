import type { NextApiRequest, NextApiResponse } from 'next';
import { randomNum } from 'utils/tools';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return;
  }
  const data = req.query;
  let date = '0';
  // let url = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx='.$gettime.'&n=1''
  if (data['rand']) {
    date = randomNum(-1, 7).toString();
  } else {
    const day = data.day as string;
    if (day.trim()) {
      date = day;
    }
  }
  // 必应 壁纸 api 接口
  // n，必要参数。这是输出信息的数量。比如n=1，即为1条，以此类推，至多输出8条。 format，非必要。返回结果的格式，不存在或者等于xml时，输出为xml格式，等于js时，输出json格式 idx，非必要。不存在或者等于0时，输出当天的图片，-1为已经预备用于明天显示的信息，1则为昨天的图片，以此类推，idx最多获取到前16天的图片信息 这里将n设定为1、format设定为js、idx设定为1，
  const url = `https://www.bing.com/HPImageArchive.aspx?format=js&idx=${date}&n=8`;
  fetch(url)
    .then(res => res.json())
    .then(result => {
      const data = result.images.map(item => 'https://www.bing.com' + item.url);
      res.status(201).json({
        message: 'Get image success!',
        data,
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'get image Error',
        error: err,
      });
    });
}

export default handler;
