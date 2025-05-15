interface GuestUsage {
    date: string;
    count: number;
  }
  
  export function checkAndUpdateGuestUsage(): boolean {
    // 确保代码在浏览器环境中运行
    if (typeof window === 'undefined') return true;
    
    const today = new Date().toDateString();
    const guestUsageKey = 'guestUsage';
    
    // 获取当前使用记录
    const storedUsage = localStorage.getItem(guestUsageKey);
    let usage: GuestUsage = { date: today, count: 0 };
    
    if (storedUsage) {
      const parsed = JSON.parse(storedUsage);
      // 如果是今天的记录，使用已存储的次数；否则重置计数
      if (parsed.date === today) {
        usage = parsed;
      }
    }
    
    // 检查是否超过每日限制(3次)
    if (usage.count >= 3) {
      return false;
    }
    
    // 更新使用次数
    usage.count++;
    localStorage.setItem(guestUsageKey, JSON.stringify(usage));
    return true;
  }
  
  export function getGuestRemainingUsage(): number {
    // 确保代码在浏览器环境中运行
    if (typeof window === 'undefined') return 3;
    
    const today = new Date().toDateString();
    const guestUsageKey = 'guestUsage';
    const storedUsage = localStorage.getItem(guestUsageKey);
    
    if (storedUsage) {
      const usage = JSON.parse(storedUsage);
      if (usage.date === today) {
        return Math.max(0, 3 - usage.count);
      }
    }
    
    return 3;
  } 