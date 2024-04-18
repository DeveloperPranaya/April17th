
export const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    return today;
  };

