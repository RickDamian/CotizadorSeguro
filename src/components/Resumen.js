import React, { Fragment } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { primeraMayuscula } from "../helper";
const ContenedorResumen = styled.div`
	padding: 1rem;
	text-align: center;
	background-color: #00838f;
	color: #fff;
	margin-top: 1rem;
`;

const Resumen = ({ datos }) => {
	const { marca, year, plan } = datos;

	if (marca === "" || year === "" || plan === "") return null;

	return (
		<Fragment>
			<ContenedorResumen>
				<h2>Resumen de Cotización </h2>
				<ul>
					<li>Marca: {primeraMayuscula(marca)}</li>
					<li>Plan: {primeraMayuscula(plan)}</li>
					<li>Año del Auto: {primeraMayuscula(year)}</li>
				</ul>
			</ContenedorResumen>
		</Fragment>
	);
};

Resumen.prototypeS = {
	datos: PropTypes.object.isRequired,
};

export default Resumen;
