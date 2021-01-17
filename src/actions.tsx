import { PlanOptions, TaskOptions, Tick, VIEW_MODE } from "./types"

import  dayjs  from 'dayjs';

export enum Actions {
  CHANGE_VIEW,
  CHANGE_SIZE,
  UPDATE_TICKS,
  SET_TASKS,
  SET_DATES,
  SET_SCROLL_WIDTH,
  SET_X
}

export interface Action {
  type: Actions
  payload: any
}


const createAction = (action: Actions, payload: any) => {
  return { type: action, payload }
}

export const changeView = (viewMode: VIEW_MODE): Action => {
  return createAction(Actions.CHANGE_VIEW, viewMode)
}

export const changeSize = (size: [number, number]): Action => {
  return createAction(Actions.CHANGE_SIZE, {width: size[0], height: size[1]})
}

export const updateTicks = (ticks: dayjs.Dayjs[]): Action => {
  return createAction(Actions.UPDATE_TICKS, ticks)
}

export const setTasks = (data: TaskOptions[]): Action => {
  return createAction(Actions.SET_TASKS, data)
}

export const setDates = (minDate: Tick, maxDate: Tick): Action => {
  return createAction(Actions.SET_DATES, {minDate, maxDate})
}

export const setScrollWidth = (width: number): Action => {
  return createAction(Actions.SET_SCROLL_WIDTH, width)
}

export const setX = (scrollWidth: number, minDate: Tick, maxDate: Tick): Action => {
  return createAction(Actions.SET_X, (tick: Tick) => interpolate(scrollWidth, minDate, maxDate, tick))
}

export const interpolate = (
  width: number,
  start: Tick,
  end: Tick,
  input: Tick
): number => {
  const distance = end.diff(start)
  const inputDistance = input.diff(start)
  const ratio = inputDistance / distance

  return width * ratio
}