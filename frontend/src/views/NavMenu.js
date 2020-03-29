import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Glyphicon, Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./NavMenu.css";

export class NavMenu extends Component {
  displayName = NavMenu.name;

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={"/"}>OPTOOL</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={"/"} exact>
              <NavItem>
                <Glyphicon glyph="home" /> Home
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/counter"} exact>
              <NavItem>
                <Glyphicon glyph="education" /> Counter
              </NavItem>
            </LinkContainer>

            <LinkContainer to={"/characterinfo"}>
              <NavItem>
                <Glyphicon glyph="user" /> 캐릭터 정보
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/rankinfo"}>
              <NavItem>
                <Glyphicon glyph="tint" /> 랭킹 정보
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/dashboard"}>
              <NavItem>
                <Glyphicon glyph="th-list" /> 대쉬 보드
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/queryserver"}>
              <NavItem>
                <Glyphicon glyph="equalizer" /> 쿼리서버 큐 리스트
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/bargraphtest"}>
              <NavItem>
                <Glyphicon glyph="equalizer" /> 그래프 테스트
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/bargraphtestlocal"}>
              <NavItem>
                <Glyphicon glyph="equalizer" /> 그래프 테스트 2
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
