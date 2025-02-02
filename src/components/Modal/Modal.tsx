import React, { useState } from "react";
import "./modal.css";
import Card from "../Card/Card";

interface ModalProps {
    closeModal: () => void;
}

export default function Modal({ closeModal }: ModalProps) {

    return (
			<div className="modal">
				<div className="modal__content">
					<Card />
					<button onClick={closeModal} className="btn__close">
						Close
					</button>
				</div>
			</div>
		);
}