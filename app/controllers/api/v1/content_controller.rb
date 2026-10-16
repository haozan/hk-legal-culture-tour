class Api::V1::ContentController < Api::BaseController
  def show
    paper_name = params[:paper].presence || ContentSnapshot::PAPER_NAME
    snapshot = ContentSnapshot.find_by(paper_name: paper_name)
    snapshot ||= ContentSnapshot.create!(paper_name: paper_name, data: ContentSnapshot.default_data) if paper_name == ContentSnapshot::PAPER_NAME
    raise ActiveRecord::RecordNotFound unless snapshot

    response.headers['Cache-Control'] = 'public, max-age=60, must-revalidate'
    render json: ContentSnapshot.normalize_data(snapshot.data).merge(
      paperName: snapshot.paper_name,
      updatedAt: snapshot.updated_at.iso8601,
      publishedAt: snapshot.published_at&.iso8601
    )
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'paper_not_found' }, status: :not_found
  end
end
