import { http } from '@/utils/http'
import { isArray } from '@/utils/validate'

export function Request(params, filter?): any {
  // console.log('mock request', params, filter)
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: [
            { fault_id: 12, device_id: 34, status: '未处理', phone_number: 133323, isMember: '1', grade: '一级' },
            { fault_id: 56, device_id: 78, phone: 155, isMember: '0' },
          ],
          success: true,
          total: 100,
        }),
      1000,
    )
  })
}

export async function reportInitRequest(params, filter) {
  try {
    const { pageSize, current, ...filterParams } = params
    const page_size = params.pageSize
    const requestData = {
      params: {
        page_size,
        current,
        filterParams,
      }
    }
    // console.log('Sending request with data:', requestData)
    const ReportResponse = await http.get('/api/fault', requestData)
    // const Response = await http.post('/api/fault', requestData)

    const data = ReportResponse.data

    const status: boolean = !data.status_code
    
    const fault = data.fault
    const faultIsArray = isArray(fault) ? fault : [fault]
    const totalNumber = faultIsArray.length

    const faultArray = faultIsArray.map((item,index) => {
      return {
        id: index + 1,
        fault_id: item.id,
        device_id: item.device.id?item.device.id:0,
        owner: item.device.owner.name ? item.device.owner.name : '无',
        device_name: item.device.device_name ? item.device.device_name : '无',
        address:item.device.address?item.device.address:'无',
        phone_number: item.device.owner.phone_number,
        description: item.description,
        create_time: item.create_time,
        status: item.status,
      }
    })

    const neededData = {
      data: faultArray,
      success: status,
      total: totalNumber,
    }
    return neededData
  }
  catch (error) {
    console.log(error)
  }
}

export async function reportUpdateRequest(values, formData) {

  // console.log('formData:', formData)
  // console.log('values:', values)
  const fault_id = Number(formData.fault_id)
  const device_id = Number(formData.device_id)
  const description = values.description
  const status = Number(values.status)
  const create_time = values.create_time

  try {
    const requestData = {
      fault_id,
      device_id,
      description,
      status,
      create_time,
    }
    //console.log('Sending request with data:', requestData)
    await http.post('/api/fault/update', requestData)
    // const Response = await http.post('/api/fault/update', requestData)
    // const data = Response.data
  }
  catch (error) {
    console.log(error)
  }
}


// export function deleteRecord(ids) {
//   // console.log('delete record', ids)
//   return new Promise((resolve) => {
//     console.log('delete record', ids)
//     setTimeout(() => resolve(true), 500)
//   })
// }
