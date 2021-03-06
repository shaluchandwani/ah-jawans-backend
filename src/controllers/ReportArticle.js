import models from '../models';
import { findArticle } from './helpers/rateHelper';

const { ReportedArticles } = models;
/**
 * @description CRUD for reporting and article
 * @author Patrick
 */
export default class ReportArticleController {
  /**
       * @param {Object} req
       * @param {Object} res
       * @returns {Object} Report article
       */
  static async createReport(req, res) {
    try {
      const { articleId } = req.params;
      const userId = req.user.id;
      const { comment, reportType } = req.body;
      const article = await findArticle(articleId);
      return article ? await ReportedArticles.create({ articleId,
        userId,
        comment,
        reportType })
      && res.status(201).json({ message: 'Article reported succesfully' })
        : res.status(404).json({ error: 'Article not found!' });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  /**
       * @param {Object} req
       * @param {Object} res
       * @returns {Object} Get all reported article
       */
  static async getAllReports(req, res) {
    try {
      const { articleId } = req.params;
      const reports = await ReportedArticles.findAll({ where: { articleId } });
      return reports.length ? res.status(200).json({ message: 'Articles reported', reports })
        : res.status(404).json({ error: 'No reported article found!' });
    } catch (error) {
      return res.status(500).json({ error: 'server error!' });
    }
  }

  /**
   * @param { Object} req
   * @param {Object} res
   * @returns {Object} Get reported article
   */
  static async getReport(req, res) {
    try {
      const { articleId } = req.params;
      const article = await ReportedArticles.findOne({ where: { articleId } });
      return article ? res.status(200).json({ message: 'Reported article', article })
        : res.status(404).json({ error: 'No report found for this article' });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  /**
  * @param { Object} req
  * @param {Object} res
  * @returns {Object} Delete reported article
  */
  static async deleteReport(req, res) {
    try {
      const { articleId } = req.params;
      const article = await findArticle(articleId);
      return article ? await ReportedArticles.destroy({ where: { articleId } })
        && res.status(204).json({ message: 'Report deleted!' })
        : res.status(404).json({ error: 'No report found for this article' });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
}
