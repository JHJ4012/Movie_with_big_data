import React, { Component } from 'react';
import axios from 'axios';
import './css/Search.css'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Aboutmovie from '../components/table/About_movie'
import Aboutpeople from '../components/table/About_people'
import Aboutcompany from '../components/table/About_company'
import { withStyles } from '@material-ui/core/styles';
import firebase from '../firebase';

const styles  = {
  margin: {
    margin : 10,
  },
};

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      control: 0,
      data: [],
      select_value: ['영화 제목', '영화인', '영화사'],
      selected: '영화 제목',
      page : 1,
      input_data : ''
    }
  }

  change_Button_Value() {
    if (this.state.control + 1 !== this.state.select_value.length) {
      this.setState({
        control: this.state.control + 1
      })
    } else {
      this.setState({
        control: 0
      })
    }
  }

  async with_Movie_Title(title) { //페이징 기법 써서 페이지로 불러오게 해야됨 curPage 페이지 설정
    this.setState({
      data: [],
      input_data : title,
    })
    await axios //영화 기본적인 정보 가져오기 (필수 : key)
      .get('http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=3818fb091b22e03256915a3dc3ab9f71&movieNm=' + title+'&curPage='+this.state.page)
      .then(res => {
        console.log(res)
        if (res.data.movieListResult.movieList.length !== 0) {
          this.setState({
            data: res.data.movieListResult.movieList
          })
        } else {
          alert('검색 결과가 없습니다.')
        }
      })
      .catch(err => {
        console.log(err)
      });
  };

  async with_People_Name(people) {
    this.setState({
      data: [],
      input_data : people,
    })
    await axios
      .get('http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json?key=3818fb091b22e03256915a3dc3ab9f71&peopleNm=' + people+'&curPage='+this.state.page)
      .then(res => {
        if (res.data.peopleListResult.peopleList.length !== 0) {
          this.setState({
            data: res.data.peopleListResult.peopleList
          })
        } else {
          alert('검색 결과가 없습니다.')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  async with_Company_Name(company) {
    this.setState({
      data: [],
      input_data : company,
    })
    await axios
      .get('http://www.kobis.or.kr/kobisopenapi/webservice/rest/company/searchCompanyList.json?key=3818fb091b22e03256915a3dc3ab9f71&companyNm=' + company+'&curPage='+this.state.page)
      .then(res => {
        if (res.data.companyListResult.companyList.length !== 0) {
          this.setState({
            data: res.data.companyListResult.companyList
          })
        } else {
          alert('검색 결과가 없습니다.')
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const {classes} = this.props;
    return (
      <div className="search_screen">
        <Button variant="contained" color="secondary"
          onClick={function () {
            this.setState({
              data: []
            })
            this.change_Button_Value()
            document.getElementsByClassName("MuiInputBase-input")[0].value = '';
          }.bind(this)}> {this.state.select_value[this.state.control]} </Button>
        <form onSubmit={function (e) {
          e.preventDefault();
          if (this.state.select_value[this.state.control] === '영화 제목') {
            this.with_Movie_Title(e.target.search_value.value);
          } else if (this.state.select_value[this.state.control] === '영화인') {
            this.with_People_Name(e.target.search_value.value);
          } else if (this.state.select_value[this.state.control] === '영화사') {
            this.with_Company_Name(e.target.search_value.value);
          }
        }.bind(this)}>
          <Paper className="search_form">
            <InputBase placeholder="검색해주세요" className="inputBase" name="search_value" />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>
        <div>
          {this.state.data.length !== 0 && this.state.select_value[this.state.control] === '영화 제목' ? <Aboutmovie data={this.state.data} /> : ''}
          {this.state.data.length !== 0 && this.state.select_value[this.state.control] === '영화인' ? <Aboutpeople data={this.state.data} /> : ''}
          {this.state.data.length !== 0 && this.state.select_value[this.state.control] === '영화사' ? <Aboutcompany data={this.state.data} /> : ''}
        </div>
        <div>
          <Button variant="contained" className = {classes.margin} onClick={function(){
            if(this.state.page === 1){
              return 
            }else{
              this.state.page -= 1;
              if (this.state.select_value[this.state.control] === '영화 제목') {
                this.with_Movie_Title(this.state.input_data);
              } else if (this.state.select_value[this.state.control] === '영화인') {
                this.with_People_Name(this.state.input_data);
              } else if (this.state.select_value[this.state.control] === '영화사') {
                this.with_Company_Name(this.state.input_data);
              }
            }
          }.bind(this)}>
            &lt;
          </Button>
          <Button variant="contained" className = {classes.margin} onClick={function(){
            this.state.page += 1;
            if (this.state.select_value[this.state.control] === '영화 제목') {
              this.with_Movie_Title(this.state.input_data);
            } else if (this.state.select_value[this.state.control] === '영화인') {
              this.with_People_Name(this.state.input_data);
            } else if (this.state.select_value[this.state.control] === '영화사') {
              this.with_Company_Name(this.state.input_data);
            }
          }.bind(this)}>
            &gt;
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Search);