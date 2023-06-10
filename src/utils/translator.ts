import md5 from 'md5'
import axios from 'axios'

export default async function translator(
  text: string,
  from = 'auto',
  to = 'en'
) {
  const BAIDU_APP_ID = '20230525001689481' // User can free to use this api
  const BAIDU_API_KEY = 'WIxI9X2a5Vsq93AU2yfg'

  const url = `http://api.fanyi.baidu.com/api/trans/vip/translate`
  const salt = '1435660288'
  const mes = BAIDU_APP_ID + text + salt + BAIDU_API_KEY
  const sign = md5(mes)

  const formData = new URLSearchParams()
  formData.append('q', text)
  formData.append('from', from)
  formData.append('to', to)
  formData.append('appid', BAIDU_APP_ID)
  formData.append('salt', salt)
  formData.append('sign', sign)

  const res: any = await axios(url, {
    method: 'POST',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: formData,
  })

  return res.data.trans_result[0].dst
}
