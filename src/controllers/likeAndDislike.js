import model from '../models';
import LikesDislikesHelpers from '../helpers/likeAndDislikes';

const { LikeAndDislike } = model;

/**
  * This class contains Like and dislike controller
  */
class LikesAndDislikes {
/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} Liked article and number of likes
 */
  static async likeArticle(req, res) {
    const findArticleId = req.params.id;
    const article = await LikesDislikesHelpers.findOneArticle(findArticleId);

    if (!article) return res.status(404).json({ message: 'Article not found' });

    const { id } = req.user;

    const liked = await LikesDislikesHelpers.findArticleLikes(id, findArticleId);
    const disliked = await LikesDislikesHelpers.findDisliked(id, findArticleId);

    const unlikedArticle = await LikesDislikesHelpers.findUnlikedArticle(id, findArticleId);

    const userReacted = await LikesDislikesHelpers.userLikedOrDiskedArticle(id, findArticleId);

    if (!userReacted[0]) {
      await LikeAndDislike.create({ userId: id,
        articleId: article.id,
        likes: true });
      const likes = await LikesDislikesHelpers.countArticleLikes(article.dataValues.id);

      return res.status(200).json({ likes });
    }

    if (liked[0]) {
      await LikesDislikesHelpers.updateArticlesLiskes(liked[0].id);
      const likes = await LikesDislikesHelpers.countArticleLikes(article.dataValues.id);
      return res.status(200).json({ likes });
    }

    if (unlikedArticle[0]) {
      await LikesDislikesHelpers.ChangeFromDislikeToLike(unlikedArticle[0].id);
      const likes = await LikesDislikesHelpers.countArticleLikes(article.dataValues.id);
      return res.status(200).json({ likes });
    }

    if (disliked[0]) {
      await LikesDislikesHelpers.ChangeFromDislikeToLike(disliked[0].id);
      const likes = await LikesDislikesHelpers.countArticleLikes(article.dataValues.id);
      return res.status(200).json({ likes });
    }
  }

  /**
    * @param  {object} req
    * @param  {object} res
    * @return {object} Disliked article and number of Dislikes
    */
  static async dislikeArticle(req, res) {
    const findArticleId = req.params.id;
    const article = await LikesDislikesHelpers.findOneArticle(findArticleId);

    if (!article) return res.status(404).json({ message: 'Article not found' });

    const { id } = req.user;

    const dislikedArticle = await LikesDislikesHelpers.findDislikedArticle(id, findArticleId);

    const disliked = await LikesDislikesHelpers.findDisliked(id, findArticleId);
    const liked = await LikesDislikesHelpers.findArticleLikes(id, findArticleId);

    const userReacted = await LikesDislikesHelpers.userLikedOrDiskedArticle(id, findArticleId);

    if (!userReacted[0]) {
      await LikeAndDislike.create({ userId: id,
        articleId: article.id,
        dislikes: true });
      const dislikes = await LikesDislikesHelpers.countArticleDisikes(article.dataValues.id);

      return res.status(200).json({ dislikes });
    }

    if (disliked[0]) {
      await LikesDislikesHelpers.updateArticleDisliskes(disliked[0].id);
      const dislikes = await LikesDislikesHelpers.countArticleDisikes(article.dataValues.id);

      return res.status(200).json({ dislikes });
    }
    if (dislikedArticle[0]) {
      await LikesDislikesHelpers.ChangeFromLikeToDislike(dislikedArticle[0].id);
      const dislikes = await LikesDislikesHelpers.countArticleDisikes(article.dataValues.id);

      return res.status(200).json({ dislikes });
    }

    if (liked[0]) {
      await LikesDislikesHelpers.ChangeFromLikeToDislike(liked[0].id);
      const dislikes = await LikesDislikesHelpers.countArticleDisikes(article.dataValues.id);

      return res.status(200).json({ dislikes });
    }
  }
}

export default LikesAndDislikes;
