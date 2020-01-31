import React, {Component} from 'react';

class TaskItem extends Component{

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render(){

        var { task, index } = this.props

    return (
    	<tr>
            <td>{index + 1}</td>
            <td>{task.name}</td>
            <td className="text-center">
                <span   className={ task.status === true ? 'badge badge-pill badge-success' : 'badge badge-pill badge-danger'}
                        onClick = {this.onUpdateStatus}
                > 
                    {task.status === true ? 'Ẩn' : 'Kích hoạt'}
                </span>
            </td>
            <td>
                <button type="button" className="btn btn-warning btn-sm" onClick={this.onUpdate}>
                    <span className="fas fa-edit"></span> Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger btn-sm" onClick={this.onDelete}>
                    <span className="fas fa-window-close" ></span> Xóa
                </button>
            </td>
        </tr>
    );
}
}
export default TaskItem;
