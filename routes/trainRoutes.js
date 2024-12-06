const express = require('express');
const router = express.Router();
const RailService = require('../schema/Train');
const { authenticateUser } = require('../middle/middleware');

router.use(authenticateUser);

router.get('/search', async (req, res) => {
  try {
    let { departureStation, arrivalStation } = req.query;

    if (!departureStation || !arrivalStation) {
      return res.status(400).json({ message: '🔍 Departure and arrival stations are required.', success: false });
    }

    departureStation = departureStation.trim();
    arrivalStation = arrivalStation.trim();

    const services = await RailService.findAll({
      where: {
        departureStation,
        arrivalStation,
      },
    });

    if (services.length === 0) {
      return res.status(404).json({ message: '🛤️ No services found for the selected route.', success: false });
    }

    const formattedServices = services.map(service => ({
      serviceName: service.serviceName,
      trainCode: service.trainCode,
      departureStation: service.departureStation,
      arrivalStation: service.arrivalStation,
      capacity: service.capacity,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    }));

    return res.status(200).json({
      message: '✅ Services retrieved successfully!',
      success: true,
      data: formattedServices,
    });
  } catch (error) {
    console.error('🚨 Error retrieving services:', error);
    return res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
