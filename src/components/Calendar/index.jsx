import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const subjectLabels = [
    { label: 'Mã lớp', ref: 'classId', isNumber: true },
    { label: 'Mã lớp kèm', ref: 'classIdSub', isNumber: true },
    { label: 'Tên lớp lớp', ref: 'className', isNumber: false },
    { label: 'Mã học phần', ref: 'courseId', isNumber: false },
    // { label: 'Loại lớp', ref: 'classType' },
    // { label: 'TT lớp', ref: 'classStatus' },
    // { label: 'Yêu cầu', ref: 'require' },
    // { label: 'Trạng thái ĐK', ref: 'registerStatus' },
    // { label: 'Loại ĐK', ref: 'registerType' },
    // { label: 'TC', ref: 'credit' },
];

const scheduleLabels = [
    { label: 'Thứ', ref: 'weekdays', isNumber: true },
    { label: 'Thời gian', ref: 'duration', isNumber: false },
    { label: 'Tuần học', ref: 'weeks', isNumber: false },
    { label: 'Phòng học', ref: 'room', isNumber: false },
    { label: 'Lớp học', ref: 'classId', isNumber: true },
];

const getCalendarDescription = (data) => {
    let role;
    let action;
    switch (data.role) {
        case '2':
            role = 'giảng viên';
            action = 'dạy';
            break;
        case '1':
            role = 'trợ giảng';
            action = 'hỗ trợ';
            break;
        case '0':
            role = 'sinh viên';
            action = 'đăng ký';
            break;
        default:
            break;
    }

    return { desc1: `Các lớp ${action} của ${role} ${data.name}`, desc2: `Thời khóa biểu các lớp ${action}` };
};

const Calendar = ({ data, classes, schedule }) => {
    const { desc1, desc2 } = getCalendarDescription(data);
    return (
        <div className="main-session calendar-container">
            <div className="calendar-title">
                <CalendarMonthIcon className="calendar-icon" />
                THỜI KHÓA BIỂU
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
