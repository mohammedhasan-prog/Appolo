const reportsService = require('../services/admin-reports.service');

const getDashboard = async (req, res, next) => {
  try {
    const data = await reportsService.getDashboardMetrics();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getAppointmentsReport = async (req, res, next) => {
  try {
    const data = await reportsService.getAppointmentsReport(req.query);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getRevenueReport = async (req, res, next) => {
  try {
    const data = await reportsService.getRevenueReport();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getCancellationsReport = async (req, res, next) => {
  try {
    const data = await reportsService.getCancellationsReport();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getPatientsReport = async (req, res, next) => {
  try {
    const data = await reportsService.getPatientsReport(req.query);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getAuditLogs = async (req, res, next) => {
  try {
    const data = await reportsService.getAuditLogs();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getDashboard,
  getAppointmentsReport,
  getRevenueReport,
  getCancellationsReport,
  getPatientsReport,
  getAuditLogs
};
