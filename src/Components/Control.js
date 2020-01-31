import React, {Component} from 'react';

class Control extends Component{

	constructor(props){
		super(props);
		this.state={
			FindName : '',
		}
	}

	onFind = () => {
		this.props.onFind(this.state.FindName);
	}

	onSort = (sortBy, sortValue) => {
		this.props.onSort(sortBy, sortValue);
	}

	onChange = (event) => {
		var target = event.target;
		var value = target.value;
		var name = target.name;
		this.setState({
			[name] : value
		});
	}

    render(){

   	var { FindName } = this.state;

    return (
    	<div>
    		<div className="btn-toolbar">
			<div className="input-group">
		  		<input 
		  				type="text" 
		  				className="form-control" 
		  				placeholder="Search"
		  				name = "FindName" 
		  				value={FindName}
		  				onChange = {this.onChange}
		  		/>
		  		<div className="input-group-append">
		    		<button 
		    				className="btn btn-primary btn-sm" 
		    				type="button" 
		    				id="button-addon2"
		    				onClick={this.onFind}>
		    			<span className="fas fa-search"></span> Tìm
		    		</button>
		  		</div>
		  	</div>&nbsp;
		  	<div className="dropdown">
		  		<button className="btn btn-primary btn-sm dropdown-toggle" 
		  				type="button" id="dropdownMenuButton" 
		  				data-toggle="dropdown" 
		  				aria-haspopup="true" 
		  				aria-expanded="false">
	  		    	Sắp xếp
		  		</button>
		  			<ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenuButton">
				  	<li onClick={ () => this.onSort('name', 1)}>
				  		<span className="fas fa-sort-alpha-down"> </span>&nbsp;
				  		<a role="button">
				  			Từ A - Z
				  		</a>&nbsp;
				  		<span className={(this.props.sortBy === 'name' && this.props.sortValue === 1) ? 'fas fa-check' : ''}>
				  		</span>
				  	</li>
				  	<li onClick={ () => this.onSort('name', -1)}>
				  		<span className="fas fa-sort-alpha-down-alt"></span>&nbsp;
				  		<a role="button">
				  			 Từ Z - A
				  		</a>&nbsp;
				  		<span className={(this.props.sortBy === 'name' && this.props.sortValue === -1) ? 'fas fa-check' : ''}>
				  		</span>
				  	</li>
				  	<li className="dropdown-divider"></li>
				  	<li onClick={ () => this.onSort('status', 1)}>
				  		<a role="button">
				  			Theo kích hoạt
				  		</a>&nbsp;
				  		<span className={(this.props.sortBy === 'status' && this.props.sortValue === 1) ? 'fas fa-check' : ''}>
				  		</span>
				  	</li>
				  	<li onClick={ () => this.onSort('status', -1)}>
				  		<a role="button">
				  			Theo ẩn
				  		</a>&nbsp;
				  		<span className={(this.props.sortBy === 'status' && this.props.sortValue === -1) ? 'fas fa-check' : ''}>
				  		</span>
				  	</li>
				</ul>
		    </div>
		</div>
	</div>
    );

}
}

export default Control;
