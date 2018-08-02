import React, { Component } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import Server from '../API/server'
import { Row, Col, Grid } from 'react-bootstrap';

class AnalyticsComponent extends Component {

    constructor() {
        super();
        this.state = {
            monthlyQuiz: [],
            totalQuiz: 0,
            monthlyUser: [],
            totalUser: 0,
        }
        var monthlyQuiz = [];
        var monthlyUser = [];
        for (let index = 0; index < 12; index++) {
            monthlyQuiz[index] = 0;
            monthlyUser[index] = 0;
        }

        Server.getQuizOnMonth().then((res) => {
            res.data.forEach(element => {
                monthlyQuiz[element.Month - 1] = element.Count
            });
            this.setState({
                monthlyQuiz: monthlyQuiz
            })
        })

        Server.getTotalQuizCount().then((res) => {
            console.log(res.data);
            this.setState({
                totalQuiz: res.data
            });
        });


        Server.getTotalUserCount().then((res) => {
            console.log(res.data);
            this.setState({
                totalUser: res.data
            });
        })

        Server.getUserOnMonth().then((res) => {
            console.log(res.data);
            res.data.forEach(element => {
                monthlyUser[element.Month - 1] = element.Count
            });
            this.setState({
                monthlyUser: monthlyUser
            })
        });


    }

    render() {
        console.log(this.state);
        var renderQuizMonthlyData = this.state.monthlyQuiz;
        var monthlyQuizData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Quiz Per Month',
                    borderColor: '#aeaeae',
                    borderWidth: 2,
                    backgroundColor: "#FFCA1F",
                    data: renderQuizMonthlyData
                }
            ]
        }

        var renderQuizMonthlyUser = this.state.monthlyUser;
        var monthlyUserData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Users Per Month',
                    borderColor: '#aeaeae',
                    borderWidth: 2,
                    backgroundColor: "#9ADBAD",
                    data: renderQuizMonthlyUser
                }
            ]
        }

        var regressionQuizData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Users Per Month',
                    borderColor: '#aeaeae',
                    borderWidth: 2,
                    backgroundColor: "#9ADBAD",
                    data: [{
                        x: 5,
                        y: 5
                    }, {
                        x: 10,
                        y: 7
                    },{
                        x: 9,
                        y: 10
                    }, {
                        x: 10,
                        y: 10
                    },{
                        x: 12,
                        y: 11
                    }, {
                        x: 12,
                        y: 12
                    }]
                }
            ]
        }
        return (
            <div>
                <Grid>
                <Row className="show-grid">
                        <Col xs={12} md={12}>
                           <Line
                                data={regressionQuizData}
                                width={200}
                                height={300}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={4} md={4}>
                            <svg width="250" height="250">
                                <circle cx="125" cy="125" r="100" fill="#278ECF" />
                                <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize="100px" fontFamily="Arial" dy=".3em">{this.state.totalQuiz}</text>
                                <text x="60%" y="70%" textAnchor="end" fill="white" fontSize="10px" fontFamily="Arial" dy=".3em">Total Quiz</text>
                                Sorry, your browser does not support inline SVG.
                        </svg>
                        </Col>
                        <Col xs={8} md={8}>
                            <Bar
                                data={monthlyQuizData}
                                width={200}
                                height={300}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={8} md={8}>
                            <Bar
                                data={monthlyUserData}
                                width={200}
                                height={300}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </Col>
                        <Col xs={4} md={4}>
                            <svg width="250" height="250">
                                <circle cx="125" cy="125" r="100" fill="#278ECF" />
                                <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize="100px" fontFamily="Arial" dy=".3em">{this.state.totalUser}</text>
                                <text x="60%" y="70%" textAnchor="end" fill="white" fontSize="10px" fontFamily="Arial" dy=".3em">Total Users</text>
                                Sorry, your browser does not support inline SVG.
                        </svg>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default AnalyticsComponent;