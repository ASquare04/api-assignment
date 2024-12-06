const express = require('express');
const { Op } = require('sequelize');
const Reservation = require('../schema/Booking');
const RailService = require('../schema/Train');
const { authenticateUser } = require('../middle/middleware');
const router = express.Router();

router.use(authenticateUser);

router.post('/reserve', async (req, res) => {
  const { trainCode, departureStation, arrivalStation } = req.body;

  if (!trainCode || !departureStation || !arrivalStation) {
    return res.status(400).json({ status: 'ERROR', message: '⛔ Missing required fields.' });
  }

  let transaction;

  try {
    transaction = await RailService.sequelize.transaction();

    const service = await RailService.findOne({
      where: { trainCode, departureStation, arrivalStation },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });

    if (!service) {
      await transaction.rollback();
      return res.status(404).json({ status: 'ERROR', message: '🚫 Service not found.' });
    }

    if (service.capacity <= 0) {
      await transaction.rollback();
      return res.status(400).json({ status: 'NO_SEATS', message: '❌ No seats available.' });
    }

    service.capacity -= 1;
    await service.save({ transaction });

    const reservation = await Reservation.create(
      {
        linkedTrainId: trainCode,
        seatAvailability: 'reserved',
        departureStation,
        arrivalStation,
      },
      { transaction }
    );

    await transaction.commit();

    return res.status(201).json({ status: 'SUCCESS', reservationId: reservation.reservationId });
  } catch (error) {
    if (transaction) await transaction.rollback();
    return res.status(500).json({ status: 'ERROR', message: error.message });
  }
});

module.exports = router;
