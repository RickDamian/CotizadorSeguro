import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from "../helper";
const Campo = styled.div`
	display: flex;
	margin-bottom: 1rem;
`;

const Label = styled.label`
	flex: 0 0 100px;
`;

const Select = styled.select`
	display: block;
	width: 100%;
	padding: 1rem;
	border: 1px solid #e1e1e9;
	-webkit-appearance: none;
`;

const InputRadio = styled.input`
	margin: 0 1rem;
`;

const Boton = styled.button`
	padding: 1rem;
	font-size: 16px;
	background-color: #00838f;
	width: 100%;
	text-transform: uppercase;
	color: #fff;
	font-weight: bold;
	border: none;
	-webkit-appearance: none;
	transition: background-color 0.3s ease;
	margin-top: 2rem;
	&:hover {
		background-color: #26c6da;
		cursor: pointer;
	}
`;

const Error = styled.div`
	background-color: red;
	color: white;
	padding: 1rem;
	margin-bottom: 1rem;
	width: 100%;
	text-align: center;
`;
const Formulario = ({ guardarResumen, guardarCargando }) => {
	const [datos, guardarDatos] = useState({
		marca: "",
		year: "",
		plan: "",
	});

	const [error, guardarError] = useState(false);
	// extraer valores

	const { marca, year, plan } = datos;

	// Leer datos del formulario y colocarlos en el state

	const obtenerInformacion = (e) => {
		guardarDatos({
			...datos,
			[e.target.name]: e.target.value,
		});
	};

	//cuando el usuario presiona submit
	const cotizarSeguro = (e) => {
		e.preventDefault();
		if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
			guardarError(true);
			return;
		}

		guardarError(false);

		//obtener diferencia de años
		let resultado = 2000;

		const diferencia = obtenerDiferenciaYear(year);
		resultado -= (diferencia * 3 * resultado) / 100;
		// resultado -= (diferencia * 0.03 * resultado) ;

		//calcular porcentaje marca
		resultado = calcularMarca(marca) * resultado;

		const incrementoPlan = obtenerPlan(plan);

		resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

		guardarCargando(true);

		setTimeout(() => {
			guardarCargando(false);
			guardarResumen({
				cotizacion: Number(resultado),
				datos,
			});
		}, 0);
	};
	return (
		<form onSubmit={cotizarSeguro}>
			{error ? <Error>Todos los Campos son obligatorios</Error> : null}
			<Campo>
				<Label>Marca</Label>
				<Select name="marca" value={marca} onChange={obtenerInformacion}>
					<option value="">-- Seleccione --</option>
					<option value="americano">Americano</option>
					<option value="europeo">Europeo</option>
					<option value="asiatico">Asiatico</option>
				</Select>
			</Campo>

			<Campo>
				<Label>Año</Label>
				<Select name="year" value={year} onChange={obtenerInformacion}>
					<option value="">-- Seleccione --</option>
					<option value="2021">2021</option>
					<option value="2020">2020</option>
					<option value="2019">2019</option>
					<option value="2018">2018</option>
					<option value="2017">2017</option>
					<option value="2016">2016</option>
					<option value="2015">2015</option>
					<option value="2014">2014</option>
					<option value="2013">2013</option>
					<option value="2012">2012</option>
				</Select>
			</Campo>

			<Campo>
				<Label>Plan</Label>
				<InputRadio
					type="radio"
					name="plan"
					value="basico"
					checked={plan === "basico"}
					onChange={obtenerInformacion}
				/>
				Basico
				<InputRadio
					type="radio"
					name="plan"
					value="completo"
					checked={plan === "completo"}
					onChange={obtenerInformacion}
				/>
				Completo
			</Campo>
			<Boton value="cotizar">cotizar</Boton>
		</form>
	);
};

Formulario.propTypes = {
	guardarResumen: PropTypes.func.isRequired,
	guardarCargando: PropTypes.func.isRequired,
};

export default Formulario;
