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

export async function ticketInitRequest(params, filter) {
  try {
    const { pageSize, current, ...filterParams } = params
    const page_size = params.pageSize
    const requestData = {
      params: {
        page_size,
        current,
        ...filterParams,
      }
    }
    // console.log('Sending request with data:', requestData)
    const ReportResponse = await http.get('/api/work_order', requestData)
    // const Response = await http.post('/api/device', requestData)

    const data = ReportResponse.data

    const status: boolean = !data.status_code

    const ticket = data.work_order
    const ticketIsArray = isArray(ticket) ? ticket : [ticket]
    const totalNumber = ticketIsArray.length

    const ticketArray = ticketIsArray.map((item,index) => {
      return {
        id: index + 1,
        work_order_id: item.id ? item.id : 0,
        fault_id: item.fault.id ? item.fault.id : 0,
        maintenance_person_id: item.maintenance_person.id ? item.maintenance_person.id : 0,
        maintenance_person: item.maintenance_person.name ? item.maintenance_person.name : '无',
        owner: item.fault.device.owner.name ? item.fault.device.owner.name : '无',
        address: item.fault.device.address ? item.fault.device.address : '无',
        device_name: item.fault.device.device_name ? item.fault.device.device_name : '无',
        status: item.status,
        maintenance_time: item.maintenance_time,
      }
    })
    //console.log('Sending request with data:', deviceArray)

    const neededData = {
      data: ticketArray,
      success: status,
      total: totalNumber,
    }
    return neededData
  }
  catch (error) {
    console.log(error)
  }
}

export async function ticketUpdateRequest(values, formData,token) {

  const work_order_id = Number(formData.work_order_id)
  const fault_id = Number(formData.fault_id)
  const maintenance_person_id = Number(values.maintenance_person_id)
  const maintenance_time = values.maintenance_time
  const status = Number(values.status)


  try {
    const requestData = {
      work_order_id,
      fault_id,
      maintenance_person_id,
      maintenance_time,
      status,
      token,
    }
    //console.log('Sending request with data:', requestData)
    await http.post('/api/work_order/update', requestData)
    // const Response = await http.post('/api/device/update', requestData)
    // const data = Response.data
  }
  catch (error) {
    console.log(error)
  }
}

export async function deleteRecord(selectedIds, record, token) {
  //console.log('delete record', selectedIds)
  const work_order_id = record.work_order_id
  try {
    const requestData = {
      work_order_id,
      token,
    }
    // console.log('Sending request with data:', requestData)
    await http.post('/api/work_order/delete', requestData)
    // const Response = await http.post('/api/device/delete', requestData)
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


