class Admin::ContentController < Admin::BaseController
  PAPER_NAME = ContentSnapshot::PAPER_NAME

  before_action :load_snapshot

  def show
    @full_render = true
    @data = ContentSnapshot.traditionalize_data(@snapshot.data.presence || ContentSnapshot.default_data)
  end

  def save
    payload = JSON.parse(params.require(:snapshot_json))
    validate_snapshot!(payload)
    normalize_questions!(payload)
    @snapshot.update!(data: payload, published_at: nil)
    render json: { ok: true, saved_at: @snapshot.updated_at.iso8601 }
  rescue JSON::ParserError, ActionController::ParameterMissing => e
    render json: { ok: false, error: e.message }, status: :unprocessable_entity
  rescue ActiveRecord::RecordInvalid => e
    render json: { ok: false, error: e.record.errors.full_messages.to_sentence }, status: :unprocessable_entity
  end

  def publish
    @snapshot.update!(published_at: Time.current)
    redirect_to admin_content_path, notice: '題庫快照已標記為可釋出版本。'
  end

  def export
    send_data @snapshot.data.to_json,
              filename: "gangxian-content-#{Time.zone.today}.json",
              type: 'application/json',
              disposition: 'attachment'
  end

  def import
    file = params[:file]
    raise ArgumentError, '請選擇 JSON 快照檔案' unless file.respond_to?(:read)

    payload = JSON.parse(file.read)
    validate_snapshot!(payload)
    payload = ContentSnapshot.with_explanation_contents(payload)
    normalize_questions!(payload)
    @snapshot.update!(data: payload, published_at: nil)
    redirect_to admin_content_path, notice: '題庫快照已匯入伺服器。'
  rescue JSON::ParserError, ArgumentError => e
    redirect_to admin_content_path, alert: "匯入失敗：#{e.message}"
  end

  private

  def load_snapshot
    @snapshot = ContentSnapshot.find_by(paper_name: PAPER_NAME) || ContentSnapshot.find_by(paper_name: '保险原理及实务')
    @snapshot ||= ContentSnapshot.create!(paper_name: PAPER_NAME, data: ContentSnapshot.default_data)
    @snapshot.update!(paper_name: PAPER_NAME) if @snapshot.paper_name != PAPER_NAME
  end

  def validate_snapshot!(payload)
    raise ArgumentError, '快照格式不完整' unless payload.is_a?(Hash) && payload['questions'].is_a?(Array) && payload['paperOneSyllabus'].is_a?(Array)
  end

  def normalize_questions!(payload)
    payload['questions'].each do |question|
      question['tags'] = []
    end
  end
end
