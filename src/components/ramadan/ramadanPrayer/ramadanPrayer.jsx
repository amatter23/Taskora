import { useState, useEffect } from 'react';
import style from './ramadanPrayer.module.css';

const RamadanPrayer = () => {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [nextPrayer, setNextPrayer] = useState(null);
  const [nextPrayerTime, setNextPrayerTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  useEffect(() => {
    if (nextPrayerTime) {
      const interval = setInterval(() => {
        setTimeRemaining(getTimeDifference(new Date(), nextPrayerTime));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [nextPrayerTime]);

  const fetchPrayerTimes = async () => {
    try {
      const response = await fetch(
        'https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt'
      );
      const data = await response.json();
      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        updateNextPrayer(data.data.timings);
      } else {
        console.error('Error fetching prayer times:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateNextPrayer = timings => {
    const now = new Date();
    const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    let next = null;
    let nextTime = null;

    for (let prayer of prayerOrder) {
      const [hours, minutes] = timings[prayer].split(':').map(Number);
      const prayerTime = new Date();
      prayerTime.setHours(hours, minutes, 0, 0);

      if (prayerTime > now) {
        next = prayer;
        nextTime = prayerTime;
        break;
      }
    }

    if (!next) {
      next = 'Fajr';
      const [hours, minutes] = timings['Fajr'].split(':').map(Number);
      const tomorrowFajr = new Date();
      tomorrowFajr.setDate(now.getDate() + 1);
      tomorrowFajr.setHours(hours, minutes, 0, 0);
      nextTime = tomorrowFajr;
    }

    setNextPrayer(next);
    setNextPrayerTime(nextTime);
    setTimeRemaining(getTimeDifference(now, nextTime));
  };

  const getTimeDifference = (now, target) => {
    const diff = Math.max(0, Math.floor((target - now) / 1000));
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className={style.prayerContainer}>
      {nextPrayer ? (
        <>
          <h3>🕌 Next Prayer: {nextPrayer}</h3>
          <h5>⏳ Time Remaining: {timeRemaining}</h5>
        </>
      ) : (
        <p>Loading prayer times...</p>
      )}
    </div>
  );
};

export default RamadanPrayer;
