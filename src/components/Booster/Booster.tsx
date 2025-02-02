import React, { useEffect, useState } from "react";
import "./booster.css";
import Modal from "../Modal/Modal";
import { log } from "console";
interface BoosterProps {

  type: string
  title: string;

}

export default function Booster() {

	const [showModal, setShowModal] = useState(false);

	function handleOpenModal() {
		setShowModal(true);
	}
	function handleCloseModal() {
		setShowModal(false);
		
	}
  return (
		<div className="booster">
			<img
				className="booster__background"
				src="/images/boosterModel.png"
				alt="Background"
				onClick={handleOpenModal}
			/>
			{showModal && <Modal closeModal={handleCloseModal} />}
		</div>
	);
}