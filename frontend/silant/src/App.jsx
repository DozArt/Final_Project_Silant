import { useState, useContext, useEffect } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Search from './components/searchMashines'
import Header from './components/header'
import Menu from './components/menu'
import SearchMaintenance from './components/searchMaintenance'
import { Context } from '@/main'
import AddMaintenance from './components/addMaintenance'
import DetailMashine from './components/detailMashine'
import TitlePage from './components/titlePage'
import SearchClaims from './components/searchClaims'
import AddClaims from './components/addClaims'

function App() {

	const {store} = useContext(Context)

	store.loadCatalog()
	if (localStorage.getItem('accessToken')) {
		store.setAccessToken(localStorage.getItem('accessToken'))
		store.handleUser()
	}

	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Search />} />
				<Route path="/machine" element={<Search />} />
				<Route path="/machine/:id" element={<DetailMashine />} />
				<Route path="/maintenance" element={<SearchMaintenance />} />
				<Route path="/maintenance/:id" element={<SearchMaintenance />} />
				<Route path="/maintenance/add" element={<AddMaintenance />} />
				<Route path="/claims" element={<SearchClaims />} />
				<Route path="/claims/:id" element={<SearchClaims />} />
				<Route path="/claims/add" element={<AddClaims />} />
			</Routes>
			
		</>
	)
	}

export default App
