export const state = () => ({
  shifts: [
    {
      id: 1,
      code: 'm',
      name: 'morning',
      in: '10.00',
      out: '18.00',
      type: 'work'
    },
    {
      id: 2,
      code: 'md',
      name: 'middle',
      in: '12.00',
      out: '20.00',
      type: 'work'
    },
    {
      id: 3,
      code: 'af',
      name: 'afternoon',
      in: '14.00',
      out: '22.00',
      type: 'work'
    },
    {
      id: 4,
      code: 'o',
      name: 'off',
      in: '00.00',
      out: '00.00',
      type: 'leave'
    },
    {
      id: 5,
      code: 's',
      name: 'sick',
      in: '00.00',
      out: '00.00',
      type: 'leave'
    },
    {
      id: 6,
      code: 'pl',
      name: 'paid leave',
      in: '00.00',
      out: '00.00',
      type: 'leave'
    },
    {
      id: 7,
      code: 'oth',
      name: 'other permissions',
      in: '00.00',
      out: '00.00',
      type: 'leave'
    }
  ],
  shift: [],
  shiftCode: null,
  shiftName: null,
  shiftType: "work",
  timeStart: "00:00",
  timeEnd: "00:00",
  id: null,
  editedIndex: -1,
})

export const getters ={
  getWork(state){
    return state.shifts.filter((item)=>item.type === 'work')
  },
  getLeave(state){
    return state.shifts.filter((item)=>item.type === 'leave')
  }
}

export const mutations = {
  setShiftCode(state, shiftCode){
    state.shiftCode = shiftCode
  },
  setShiftName(state, shiftName){
    state.shiftName = shiftName
  },
  setTimeStart(state, timeStart){
    state.timeStart = timeStart
  },
  setTimeEnd(state, timeEnd){
    state.timeEnd = timeEnd
  },
  setType(state, shiftType){
    state.shiftType = shiftType
  },
  setEditedItem(state, item){
    state.id = item.id
    state.editedIndex = state.shifts.indexOf(item)
    state.shiftCode = item.code
    state.shiftName = item.name
    state.timeStart = item.in
    state.timeEnd = item.out
    state.type = item.type
  },
  setResetShift(state){
    state.id = null
    state.editedIndex = -1
    state.shiftCode = null
    state.shiftName = null
    state.timeStart = "00:00"
    state.timeEnd = "00:00"
  },
  setSaveShift(state){
    const shift = {
      code: state.shiftCode ? state.shiftCode : 'jha',
      name: state.shiftName,
      in: state.timeStart,
      out: state.timeEnd,
      type: state.shiftType
    }
    if(state.editedIndex > -1){
      Object.assign(state.shifts[state.editedIndex], shift)
    }else {
      state.shifts.unshift(shift)
    }
  },
  setEditedIndex(state, editedIndex){
    state.editedIndex = editedIndex
  },
  setDestroyShift(state){
    state.shifts.splice(state.editedIndex, 1)
  }
}

export const actions = {

}
