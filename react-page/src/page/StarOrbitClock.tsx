import {useEffect, useState} from "react";
import useInterval from "use-interval";
import {lastDayOfMonth} from "date-fns/lastDayOfMonth";
import {getDayOfYear} from "date-fns/getDayOfYear";
import {lastDayOfYear} from "date-fns/lastDayOfYear";

export const StarOrbitClock = () => {
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);
    const [dates, setDates] = useState({
        min: 0,
        hour: 0,
        day: 0,
        week: 0,
        month: 0,
        year: 0,
        ten_year: 0,
        century: 0,
        millennium: 0,
        ten_millennium: 0,
    });

    const handleInterval = () => {
        let currentDates: {
            min: number,
            hour: number,
            day: number,
            week: number,
            month: number,
            year: number,
            ten_year: number,
            century: number,
            millennium: number,
            ten_millennium: number,
        } = {
            min: 0,
            hour: 0,
            day: 0,
            week: 0,
            month: 0,
            year: 0,
            ten_year: 0,
            century: 0,
            millennium: 0,
            ten_millennium: 0,
        }
        const currentDate = new Date()
        currentDates.min = currentDate.getSeconds() / 60;
        currentDates.hour = currentDate.getMinutes() / 60;
        currentDates.day = currentDate.getHours() / 24;
        currentDates.week = (currentDate.getDay() + 1) / 7
        currentDates.month = currentDate.getDate() / lastDayOfMonth(currentDate).getDate();
        currentDates.year = getDayOfYear(currentDate) / getDayOfYear(lastDayOfYear(currentDate));
        currentDates.ten_year = (currentDate.getFullYear() % 10) / 10;
        currentDates.century = (currentDate.getFullYear() % 100) / 100;
        currentDates.millennium = (currentDate.getFullYear() % 1000) / 1000;
        currentDates.ten_millennium = (currentDate.getFullYear() % 10000) / 10000;
        setDates(currentDates);
    }

    useInterval(handleInterval, 100);

    const getC_XY = (magnification: number, ratio_percent: number) => {
        const cx = width / 2;
        const rx = cx * magnification;
        const cy = height / 2;
        const ry = cy * magnification;
        const theta = (ratio_percent - 0.25) * 2 * Math.PI
        return {
            x: cx + rx * Math.cos(theta),
            y: cy + ry * Math.sin(theta),
        };
    }

    const handleResize = () => {
        const height_or_width = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
        setWidth(height_or_width * 0.975);
        setHeight(height_or_width * 0.65);
    };

    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <svg width={width} height={height}>
                <g fill="none" strokeWidth={2} stroke="black">
                    {/* 1分 　 (60秒) */}
                    <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.1} ry={(height / 2) * 0.1}/>
                    {/* 1時間  (60分) */}
                    <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.175} ry={(height / 2) * 0.175}/>
                    {/* 1日　  (24時間) */}
                    <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.24} ry={(height / 2) * 0.24}/>
                    {/* 1週間  (7日) */}
                    <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.3} ry={(height / 2) * 0.3}/>
                    {/* 1カ月  (28-31日) */}
                    <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.4} ry={(height / 2) * 0.4}/>
                    {/* 1年   (12カ月) */}
                    <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.5} ry={(height / 2) * 0.5}/>
                    {/* 10年  */}
                    <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.6} ry={(height / 2) * 0.6}/>
                    {/* 1世紀  (100年) */}
                    <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.7} ry={(height / 2) * 0.7}/>
                    {/* 1千年紀 (10世紀) */}
                    <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.8} ry={(height / 2) * 0.8}/>
                    {/* 10千年紀 */}
                    <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.9} ry={(height / 2) * 0.9}/>
                </g>
                <g>
                    {/* 1分 　 (60秒) */}
                    <circle cx={getC_XY(0.1, dates.min).x} cy={getC_XY(0.1, dates.min).y} r={5}/>
                    {/* 1時間  (60分) */}
                    <circle cx={getC_XY(0.175, dates.hour).x} cy={getC_XY(0.175, dates.hour).y} r={5}/>
                    {/* 1日　  (24時間) */}
                    <circle cx={getC_XY(0.24, dates.day).x} cy={getC_XY(0.24, dates.day).y} r={5}/>
                    {/* 1週間  (7日) */}
                    <circle cx={getC_XY(0.3, dates.week).x} cy={getC_XY(0.3, dates.week).y} r={5}/>
                    {/* 1カ月  (28-31日) */}
                    <circle cx={getC_XY(0.4, dates.month).x} cy={getC_XY(0.4, dates.month).y} r={5}/>
                    {/* 1年   (12カ月) */}
                    <circle cx={getC_XY(0.5, dates.year).x} cy={getC_XY(0.5, dates.year).y} r={5}/>
                    {/* 10年  */}
                    <circle cx={getC_XY(0.6, dates.ten_year).x} cy={getC_XY(0.6, dates.ten_year).y} r={5}/>
                    {/* 1世紀  (100年) */}
                    <circle cx={getC_XY(0.7, dates.century).x} cy={getC_XY(0.7, dates.century).y} r={5}/>
                    {/* 1千年紀 (10世紀) */}
                    <circle cx={getC_XY(0.8, dates.millennium).x} cy={getC_XY(0.8, dates.millennium).y} r={5}/>
                    {/* 10千年紀 */}
                    <circle cx={getC_XY(0.9, dates.ten_millennium).x} cy={getC_XY(0.9, dates.ten_millennium).y} r={5}/>
                </g>
            </svg>
        </>
    );
}