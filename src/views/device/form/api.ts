import { http } from '@/utils/http'
import { isArray } from '@/utils/validate'

export function Request(params, filter?): any {
  // console.log('mock request', params, filter)
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: [
            { id:1, device_id: 324, device_status: 1, phone_number: 133, owner: '设备管理页', grade: '一级' },
            { id: 2, device_id: 78, phone: 155, isMember: '0' },
            { id: 3, device_id: 34, device_status: 2, phone_number: 133, owner: '设备管理页', grade: '一级' },
          ],
          success: true,
          total: 3,
        }),
      500,
    )
  })
}

export async function deviceInitRequest(params, filter) {
  try {
    const page_size = params.pageSize
    const current = params.current
    const requestData = {
      params: {
        page_size,
        current,
        ...filter,
      }
    }
    // console.log('Sending request with data:', requestData)
    const ReportResponse = await http.get('/api/device', requestData)
    // const Response = await http.post('/api/device', requestData)

    const data = ReportResponse.data

    const status: boolean = !data.status_code

    const device = data.device_list
    const deviceIsArray = isArray(device) ? device : [device]
    const totalNumber = deviceIsArray.length()

    const deviceArray = deviceIsArray.map((item,index) => {
      return {
        id: index + 1,
        user_id:item.owenr.id,
        device_id: item.id ? item.id : 0,
        owner: item.owner.name ? item.owner.name : '无',
        address: item.address ? item.address : '无',
        phone_number: item.owner.phone_number,
        device_name: item.device_name ? item.device_name : '无',
        device_status: item.device_status,
      }
    })
    //console.log('Sending request with data:', deviceArray)

    const neededData = {
      data: deviceArray,
      success: status,
      total: totalNumber,
    }
    return neededData
  }
  catch (error) {
    console.log(error)
  }
}

export async function deviceNewRequest(values, token) {

  const user_id = values.user_id
  const deice_name = values.device_name
  const device_status = Number(values.device_status)


  try {
    const requestData = {
      user_id,
      deice_name,
      device_status,
      token,
    }
    console.log('Sending request with data:', requestData)
    await http.post('/api/device/add', requestData)
    // const Response = await http.post('/api/device/add', requestData)
    // const data = Response.data
  }
  catch (error) {
    console.log(error)
  }
}

export async function deviceUpdateRequest(values, formData,token) {

  const device_id = Number(formData.device_id)
  const user_id = values.user_id
  const deice_name = values.device_name
  const device_status = Number(values.device_status)


  try {
    const requestData = {
      device_id,
      user_id,
      deice_name,
      device_status,
      token,
    }
    //console.log('Sending request with data:', requestData)
    await http.post('/api/device/update', requestData)
    // const Response = await http.post('/api/device/update', requestData)
    // const data = Response.data
  }
  catch (error) {
    console.log(error)
  }
}


// export function delelteRecord(ids) {
//   // console.log('delete record', ids)
//   return new Promise((resolve) => {
//     console.log('delete record', ids)
//     setTimeout(() => resolve(true), 500)
//   })
// }

export async function deleteRecord(selectedIds, record, token) {
  //console.log('delete record', selectedIds)
  const device_id = record.device_id
  try {
    const requestData = {
      device_id,
      token,
    }
   // console.log('Sending request with data:', requestData)
    await http.post('/api/device/delete', requestData)
    // const Response = await http.post('/api/device/delete', requestData)
    // const data = Response.data
  }
  catch (error) {
    console.log(error)
  }
}
