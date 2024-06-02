import { http } from '@/utils/http'
import { isArray } from '@/utils/validate'

export function Request(params, filter?,token?): any {
  // console.log('mock request', params, filter)
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: [
            { id:1, device_id: 324, device_status: 1, phone_number: 133, owner: '设备管理页', grade: '一级' },
          ],
          success: true,
          total: 1,
        }),
      500,
    )
  })
}

export async function userInitRequest(params, filter,token) {
  try {
    const page_size = 1
    const current = 1
    const requestData = {
      params: {
        ...filter,
        token,
      }
    }
    // console.log('Sending request with data:', requestData)
    const Response = await http.get('/api/account/view', requestData)

    const data = Response.data

    const status: boolean = !data.status_code

    const user = data.account_detail
    const userIsArray = isArray(user) ? user : [user]
    const totalNumber = userIsArray.length()

    const userArray = userIsArray.map((item,index) => {
      return {
        id: index + 1,
        user_id: item.id ? item.id : 0,
        username: item.username ? item.username : '',
        email: item.email ? item.email : '',
        role: item.role ? item.role : '',
        create_time: item.create_time ? item.create_time : '',
      }
    })
    //console.log('Sending request with data:', deviceArray)

    const neededData = {
      data: userArray,
      success: status,
      total: totalNumber,
    }
    return neededData
  }
  catch (error) {
    console.log(error)
  }
}