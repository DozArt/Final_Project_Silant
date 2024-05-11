import { useState, useContext, useEffect } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Search from './components/searchMashines'
import Header from './components/header'
import Menu from './components/menu'
import SearchMaintenance from './components/searchMaintenance'
import { Context } from '@/main'
import AddMashine from './components/addMashine'

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
			<Menu />
			
			<Routes>
				<Route path="/" element={<Search />} />
				<Route path="/mashines/add" element={<AddMashine />} />
				<Route path="/maintenance" element={<SearchMaintenance />} />
			</Routes>
			
		</>
	)
	}

export default App
