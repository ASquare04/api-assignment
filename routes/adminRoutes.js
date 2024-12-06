require('dotenv').config();
const express = require('express');
const router = express.Router();
const RailService = require('../schema/Train');
const { authenticateUser, authorizeAdmin } = require('../middle/middleware');

router.use(authenticateUser);
router.use(authorizeAdmin);

router.post('/services', async (req, res) => {
  try {
    const apiKey = req.headers['super-admin-key'];
    if (apiKey !== process.env.SUPER_ADMIN_API_KEY) {
      return res.status(401).json({ message: '🚫 Access denied: Invalid API key.', success: false });
    }

    const { serviceName, trainCode, departureStation, arrivalStation, capacity } = req.body;
    const existingService = await RailService.findOne({ where: { trainCode } });

    if (existingService) {
      return res.status(400).json({ message: '⚠️ Service code already exists.', success: false });
    }

    const newService = await RailService.create({ serviceName, trainCode, departureStation, arrivalStation, capacity });

    return res.status(201).json({
      message: '✅ Service added successfully!',
      success: true,
      data: newService,
    });
  } catch (error) {
    console.error('🚨 Error adding service:', error);
    return res.status(500).json({ message: error.message, data: error, success: false });
  }
});

router.put('/services/:trainCode', async (req, res) => {
  try {
    const { trainCode } = req.params;
    const { serviceName, departureStation, arrivalStation, capacity } = req.body;

    const service = await RailService.findOne({ where: { trainCode } });
    if (!service) {
      return res.status(404).json({ message: '❌ Service not found.', success: false });
    }

    service.serviceName = serviceName || service.serviceName;
    service.departureStation = departureStation || service.departureStation;
    service.arrivalStation = arrivalStation || service.arrivalStation;
    service.capacity = capacity || service.capacity;

    await service.save();

    return res.status(200).json({
      message: '🛠️ Service details updated successfully!',
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('🚨 Error updating service:', error);
    return res.status(500).json({ message: error.message, data: error, success: false });
  }
});

module.exports = router;
