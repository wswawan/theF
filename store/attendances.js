import dayjs from 'dayjs'

function getDate(item) {
  if (item !== undefined)
    return new Date(item.date - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)
  else
    return new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}


function filterItemByDate(state, rootState) {
  return state.attendances.filter((item) => {
    if (rootState.startDate > rootState.endDate) {
      return getDate(item) === rootState.startDate
    } else {
      return getDate(item) >= rootState.startDate && getDate(item) <= rootState.endDate
    }
  })
}

function calculateTime(milli) {
  const minute = 1000 * 60
  const hour = minute * 60

  const hours = Math.floor(milli / hour)
  const minutes = Math.floor(milli / minute % 60)

  return `${hours > 9 ? hours : '0' + hours}` + '.' + `${minutes > 9 ? minutes : '0' + minutes}`
}

function getMilliSecond(item, a, b) {
  const date = new Date(Date.now()).toISOString().slice(0, 10)
  const x = dayjs(`${date} ${item[a].slice(0, 2)}:${item[a].slice(-2)}`)
  const y = dayjs(`${date} ${item[b].slice(0, 2)}:${item[b].slice(-2)}`)
  return x.diff(y)
}

function diff(items, a, b) {
  if (Array.isArray(items)) {
    return items.filter((item) => item[a] > item[b]).map((item) => getMilliSecond(item, a, b)).reduce((a, b) => a + b)
  } else {
    return getMilliSecond(items, a, b)
  }
}


export const state = () => ({
  attendances: [
    {
      id: 13,
      date: new Date(2021, new Date().getMonth(), 26),
      clockIn: '12.00',
      clockOut: '22.32',
      scheduleIn: '12.00',
      scheduleOut: '20.00',
      scheduleCode: 'md',
      status: 'working'
    },{
      id: 12,
      date: new Date(2021, new Date().getMonth(), 8),
      clockIn: '12.00',
      clockOut: '22.32',
      scheduleIn: '12.00',
      scheduleOut: '20.00',
      scheduleCode: 'md',
      status: 'working'
    },
    {
      id: 11,
      date: new Date(2021, new Date().getMonth(), 7),
      clockIn: '00.00',
      clockOut: '00.00',
      scheduleIn: '10.00',
      scheduleOut: '18.00',
      scheduleCode: 'm',
      status: 'off'
    },
    {
      id: 10,
      date: new Date(2021, new Date().getMonth(), 6),
      clockIn: '23.00',
      clockOut: '24.19',
      scheduleIn: '12.00',
      scheduleOut: '20.00',
      scheduleCode: 'md',
      status: 'working'
    },
    {
      id: 9,
      date: new Date(2021, new Date().getMonth(), 5),
      clockIn: '00.00',
      clockOut: '00.00',
      scheduleIn: '00.00',
      scheduleOut: '00.00',
      scheduleCode: 'o',
      status: 'off'
    },
    {
      id: 8,
      date: new Date(2021, new Date().getMonth(), 4),
      clockIn: '10.00',
      clockOut: '18.19',
      scheduleIn: '10.00',
      scheduleOut: '18.00',
      scheduleCode: 'm',
      status: 'working'
    },
    {
      id: 7,
      date: new Date(2021, new Date().getMonth(), 3),
      clockIn: '00.00',
      clockOut: '00.00',
      scheduleIn: '00.00',
      scheduleOut: '00.00',
      scheduleCode: 'pl',
      status: 'paid leave'
    },
    {
      id: 6,
      date: new Date(2021, new Date().getMonth(), 2),
      clockIn: '11.00',
      clockOut: '20.19',
      scheduleIn: '14.00',
      scheduleOut: '22.00',
      scheduleCode: 'af',
      status: 'working'
    },
    {
      id: 5,
      date: new Date(2021, new Date().getMonth(), 1),
      clockIn: '00.00',
      clockOut: '00.00',
      scheduleIn: '00.00',
      scheduleOut: '00.00',
      scheduleCode: 's',
      status: 'sick'
    },
    {
      id: 4,
      date: new Date(2021, new Date().getMonth() - 1, 30),
      clockIn: '11.00',
      clockOut: '20.19',
      scheduleIn: '12.00',
      scheduleOut: '20.00',
      scheduleCode: 'md',
      status: 'working'
    },
    {
      id: 3,
      date: new Date(2021, new Date().getMonth() - 1, 29),
      clockIn: '09.11',
      clockOut: '20.19',
      scheduleIn: '10.00',
      scheduleOut: '18.00',
      scheduleCode: 'm',
      status: 'working'
    },
    {
      id: 2,
      date: new Date(2021, new Date().getMonth() - 1, 28),
      clockIn: '10.10',
      clockOut: '20.19',
      scheduleIn: '10.00',
      scheduleOut: '18.00',
      scheduleCode: 'm',
      status: 'working'
    },
    {
      id: 1,
      date: new Date(2021, new Date().getMonth() - 1, 27),
      clockIn: '11.58',
      clockOut: '20.19',
      scheduleIn: '12.00',
      scheduleOut: '20.00',
      scheduleCode: 'md',
      status: 'working'
    }
  ]
})


export const getters = {
  getAttendances(state, getters, rootState) {
    // eslint-disable-next-line no-console
    return filterItemByDate(state, rootState)
  },
  getDuration(state, getters, rootState) {
    return filterItemByDate(state, rootState).map((item) => calculateTime(diff(item, 'clockOut', 'clockIn')))
  },
  getOverTime(state, getters, rootState) {
    const items = filterItemByDate(state, rootState).filter((item) => item.status === 'working' && item.clockOut > item.scheduleOut)
    // const milli = 3600000 * 8
    if (items.length) {
      const working = items.map((item) => {
        let work
        const milli = getMilliSecond(item, 'scheduleOut', 'scheduleIn')
        if (item.clockIn > item.scheduleIn) {
          work = getMilliSecond(item, 'clockOut', 'clockIn')
        } else {
          work = getMilliSecond(item, 'clockOut', 'scheduleIn')
        }
        if (work > milli)
          return work - milli
        else
          return 0
      }).reduce((a, b) => a + b)
      return calculateTime(working)
    } else {
      return '00.00'
    }
  },
  getLate(state, getters, rootState) {
    const items = filterItemByDate(state, rootState).filter((item) => item.status === 'working' && item.clockIn > item.scheduleIn)
    if (items.length) {
      return calculateTime(diff(items, 'clockIn', 'scheduleIn'))
    } else {
      return '00.00'
    }
  },
  getStatus(state, getters, rootState) {
    const counts = {}
    filterItemByDate(state, rootState).forEach(function(item) {
      counts[item.status] = (counts[item.status] || 0) + 1
    })
    return counts
  }
}

// export const mutations = {
//   setRangeDate(rootState) {
//     rootState.startDate = new Date(new Date().setDate(26))
//     rootState.endDate = (new Date(new Date(rootState.date).getFullYear(), new Date(rootState.date).getMonth(), 26))
//   }
// }
