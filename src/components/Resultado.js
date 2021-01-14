import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Mensaje = styled.p`
	padding: 1rem;
	text-align: center;
	background-color: rgb(127, 224, 237);
	color: #fff;
	margin-top: 2rem;
`;

const ResultadoCotizacion = styled.div`
	text-align: center;
	padding: 0.5rem;
	border: 1px solid #26c6da;
	background-color: rgb(127, 224, 237);
	margin-top: 1rem;
	position: relative;
`;
const TextoCotizacion = styled.span`
	color: #00838f;
	padding: 1rem;
	text-transform: uppercase;
	font-weight: bold;
	margin: 0;
`;
const Resultado = ({ cotizacion }) => {
	const nodeRef = React.useRef(null);

	return cotizacion === 0 ? (
		<Mensaje>Elije marca,año y tipo de seguro</Mensaje>
	) : (
		<ResultadoCotizacion>
			<TransitionGroup component="p" className="resultado">
				<CSSTransition
					nodeRef={nodeRef}
					classNames="resultado"
					key={cotizacion}
					timeout={{ enter: 500, exit: 500 }}
				>
					<TextoCotizacion ref={nodeRef}>
						El total es: $ {cotizacion}
					</TextoCotizacion>
				</CSSTransition>
			</TransitionGroup>
		</ResultadoCotizacion>
	);
};

Resultado.prototypeS = {
	cotizacion: PropTypes.number.isRequired,
};

export default Resultado;
