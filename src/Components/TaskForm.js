import React, {Component} from 'react';

class TaskForm extends Component{

	constructor(props){
		super(props);
		this.state={
            id:'',
			name : '',
			status : true
		}
	}

	onCloseForm = () => {
		this.props.onCloseForm();
	}

    UNSAFE_componentWillMount(){
        if(this.props.task){
            this.setState({
                id : this.props.task.id,
                name : this.props.task.name,
                status : this.props.task.status
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id : nextProps.task.id,
                name : nextProps.task.name,
                status : nextProps.task.status
            });
        }else if(!nextProps.task){
            this.setState({
                id:'',
                name : '',
                status : true
            });
        } 
    }

	onChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value;
		if(name === 'status'){
			value = target.value === 'true' ? true : false;
		}
		this.setState({
			[name] : value
		})
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit(this.state);
		this.onClear();
		this.onCloseForm();
	}

	onClear = () => {
		this.setState({
			name : '',
			status : false
		});
	}
 
    render(){   	

        var { id } = this.state;

    return (
    	<div>
    		<div className="card">
    		  	<div className="card-body">
    		    	<form onSubmit = {this.onSubmit}>
    	  				<div className="form-row">
    	    				<div className="form-group col-md-12">
    	    					<h5>{ id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}
    	    						<span className="fas fa-times-circle text-right" onClick = {this.onCloseForm}></span>
    	    					</h5>
    	      					<label>Tên công việc</label>
    	      					<input 	type="text" 
    	      							className="form-control"
    	      							name = "name"
    	      							value = {this.state.name}
    	      							onChange = {this.onChange}/><br/>
    	      					<label>Trạng thái</label>
    	      					<select className="custom-select custom-select-sm"
    	      							name = "status"
    	      							value = {this.state.status}
    	      							onChange = {this.onChange}>
    	      		  				<option defaultValue>Trạng thái</option>
    	      		  				<option value={false}>Kích hoạt</option>
    	      		  				<option value={true}>Ẩn</option>
    	      					</select><hr/>
    	      					<div className="text-center">
	      		 					<button type="submit" className="btn btn-warning btn-sm">
      		 						<span className="fas fa-plus"></span>  Lưu lại
      		 						</button>
      		 						&nbsp;
      		 						<button type="button" className="btn btn-danger btn-sm" onClick={this.onClear}>
      		 						<span className="fas fa-window-close" ></span>  Hủy Bỏ
      		 						</button>
      		 					</div>
    	      				</div>
    	      			</div>
    				</form>
    		  	</div>
    		</div>
    	</div>
    );
}
}
export default TaskForm;
