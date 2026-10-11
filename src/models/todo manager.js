export const todoCreator = (title, desc, dueDate, createTime = new Date(), checked, priority, id = crypto.randomUUID()) => {

    const getTitle = () => title;
    const getDesc = () => desc;
    const getDueDate = () => dueDate;
    const getCreateTime = () => createTime;
    const getChecked = () => checked;
    const getPriority = () => priority;
    const getId = () => id;

    const setTitle = (newTitle) => {title = newTitle};
    const setDesc = (newDesc) => {desc = newDesc};
    const setDueDate = (newDueDate) => {dueDate = newDueDate};
    const setChecked = (newChecked) => {checked = newChecked};
    const setPriority = (newPriority) => {priority = newPriority};


    return {getTitle, getDesc, getDueDate, getCreateTime, getChecked, getPriority, getId, setTitle, setDesc, setDueDate, setChecked, setPriority}

    }