export type TaskCallback = (info: {
  id: string;
  name: string;
  scheduledTime: number;
  currentTime: number;
}) => void;

export interface Task {
  id: string;
  name: string;
  period: number;        // 间隔周期（秒）
  offset: number;        // 首次触发偏移（秒）
  loop: boolean;
  callback: TaskCallback;
}

export class TaskScheduler {
  private tasks: Map<string, Task> = new Map();
  /**
   * 注册新任务
   * @param name    任务名称
   * @param period  周期（秒）
   * @param offset  首次触发的偏移（秒）
   * @param loop    是否循环
   * @param callback 回调
   * @returns 任务 ID
   */
  public scheduleTask(
    e: Task,
    callback: TaskCallback
  ): string {
    const { id, name, period, offset, loop } = e;
    this.tasks.set(id, { id, name, period, offset, loop, callback });
    return id;
  }

  /**
   * 推进游戏时间并触发任务
   */
  public updateTime(gameTime: number): void {
    for (const [id, task] of this.tasks) {
      const { name, period, offset, loop, callback } = task;
      // 单次任务：gameTime 精确等于 offset
      if (!loop) {
        if (gameTime === offset) {
          callback({ id, name, scheduledTime: offset, currentTime: gameTime });
          this.tasks.delete(id);
        }
      } else {
        // 循环任务：gameTime >= offset 且 (gameTime - offset) % period === 0
        if (gameTime >= offset && (gameTime - offset) % period === 0) {
          callback({ id, name, scheduledTime: gameTime, currentTime: gameTime });
        }
      }
    }
  }

  /** 删除任务 */
  public removeTask(id: string): boolean {
    return this.tasks.delete(id);
  }

  /** 修改任务 */
  public modifyTask(
    id: string,
    name: string,
    period: number,
    offset: number,
    loop: boolean,
    callback: TaskCallback
  ): boolean {
    const task = this.tasks.get(id);
    if (!task) return false;
    task.name = name;
    task.period = period;
    task.offset = offset;
    task.loop = loop;
    task.callback = callback;
    return true;
  }
}