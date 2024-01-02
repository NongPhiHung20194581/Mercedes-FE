import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const subjectLabels = [
    { label: 'Class ID', ref: 'classId', isNumber: true },
    { label: 'Secondary class ID', ref: 'classIdSub', isNumber: true },
    { label: 'Class name', ref: 'className', isNumber: false },
    { label: 'Course ID', ref: 'courseId', isNumber: false },
    // { label: 'Loại lớp', ref: 'classType' },
    // { label: 'TT lớp', ref: 'classStatus' },
    // { label: 'Yêu cầu', ref: 'require' },
    // { label: 'Trạng thái ĐK', ref: 'registerStatus' },
    // { label: 'Loại ĐK', ref: 'registerType' },
    // { label: 'TC', ref: 'credit' },
];

const scheduleLabels = [
    { label: 'Weekday', ref: 'weekdays', isNumber: true },
    { label: 'Time', ref: 'duration', isNumber: false },
    { label: 'Week', ref: 'weeks', isNumber: false },
    { label: 'Room', ref: 'room', isNumber: false },
    { label: 'Class ID', ref: 'classId', isNumber: true },
];

const getCalendarDescription = (data) => {
    let desc1, desc2;
    console.log(data.role);
    switch (data.role) {
        case '2':
        case 2:
            desc1 = `Classes in charge of lecturer ${data.name}`;
            desc2 = `Detailed schedule of lecturer ${data.name}`;
            break;
        case '1':
        case 1:
            desc1 = `Support classes of tutor ${data.name}`;
            desc2 = `Detailed schedule of tutor ${data.name}`;
            break;
        case '0':
        case 0:
            desc1 = `Registered classes of student ${data.name}`;
            desc2 = `Detailed schedule of student ${data.name}`;
            break;
        default:
            break;
    }

    return { desc1, desc2 };
};

const Calendar = ({ data, classes, schedule }) => {
    const { desc1, desc2 } = getCalendarDescription(data);
    return (
        <div className="main-session calendar-container">
            <div className="calendar-title">
                <CalendarMonthIcon className="calendar-icon" />
                SCHEDULE
            </div>
            <p className="calendar-desc">{desc1}</p>
            <table>
                <thead>
                    <tr>
                        {subjectLabels.map(({ label }) => (
                            <td>{label}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {classes.map((c) => (
                        <tr>
                            {subjectLabels.map(({ ref, isNumber }) => (
                                <td className={isNumber ? 'right-align' : 'th'}>{c[ref]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="calendar-desc second-desc">{desc2}</p>
            <table>
                <thead>
                    <tr>
                        {scheduleLabels.map(({ label }) => (
                            <td>{label}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((c) => (
                        <tr>
                            {scheduleLabels.map(({ ref, isNumber }) => (
                                <td className={isNumber ? 'right-align' : 'th'}>{c[ref]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
