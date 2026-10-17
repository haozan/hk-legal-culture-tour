class Admin::ContentController < Admin::BaseController
  PAPER_NAME = ContentSnapshot::PAPER_NAME

  before_action :load_snapshot

  def show
    @full_render = true
    @data = @snapshot.data.presence || ContentSnapshot.default_data
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
    redirect_to admin_content_path, notice: '题库快照已标记为可发布版本。'
  end

  def export
    send_data @snapshot.data.to_json,
              filename: "gangxian-content-#{Time.zone.today}.json",
              type: 'application/json',
              disposition: 'attachment'
  end

  def import
    file = params[:file]
    raise ArgumentError, '请选择 JSON 快照文件' unless file.respond_to?(:read)

    payload = JSON.parse(file.read)
    validate_snapshot!(payload)
    payload = ContentSnapshot.with_explanation_contents(payload)
    normalize_questions!(payload)
    @snapshot.update!(data: payload, published_at: nil)
    redirect_to admin_content_path, notice: '题库快照已导入服务器。'
  rescue JSON::ParserError, ArgumentError => e
    redirect_to admin_content_path, alert: "导入失败：#{e.message}"
  end

  private

  def load_snapshot
    @snapshot = ContentSnapshot.find_or_create_by!(paper_name: PAPER_NAME) do |record|
      record.data = ContentSnapshot.default_data
    end
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
