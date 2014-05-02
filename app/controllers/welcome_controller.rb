require 'csv'
require_relative '../../lib/caged_beast'
require_relative '../../lib/caged_beast_csv'

class WelcomeController < ApplicationController

  def check_csv_files
    csv_files = []
    path = 'public'

    Dir.glob(path + '/**').each do |file|
      if file.include?('.csv') || file.include?('.CSV')
        csv_files << file
      end
    end
  end

  def index
  	csv_files = []
  	path = 'public'

  	Dir.glob(path + '/**').each do |file|
  		if file.include?('.csv') || file.include?('.CSV')
        file_name = File.basename(file)
  			csv_files << file_name
  		end
  	end
  	@num = 1
  	@show_file = csv_files
  end

  def upload
    if params[:csv].nil?
      redirect_to root_url
    else
    	file = params[:csv].read
    	filename = params[:csv].original_filename
    	File.open(File.join(Rails.root, 'public', filename), 'wb') { |f| f.write file }
    	# render save_to_file: Rails.root.join('public', file),
    	# save_only: true

    	redirect_to root_url
    end
  end

  def csv
    if params[:url].nil?
      redirect_to root_url
    elsif params[:file_name].nil?
      redirect_to root_url
    end

    url = params[:url]
    file = params[:file_name]
    server_location_to_store = 'public'
    cage = CagedBeast.new(url).show
    build_and_store_csv = CagedBeastCSV.new(url,server_location_to_store, file, cage).build_csv
    redirect_to root_url
  end

  def delete_file
    file_to_delete = params[:file_delete]
    
    render layout: false
  end


  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def test_params
      params.require(:welcome).permit(:csv)
    end
end
















