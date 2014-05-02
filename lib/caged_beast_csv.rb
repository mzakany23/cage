require 'csv'
require_relative 'caged_beast'

class CagedBeastCSV

	def initialize(mojo_path, location_to_store, file_name, data_object)
		@path = mojo_path
		@location = location_to_store
		@name = file_name
		@data = data_object
		@cage = CagedBeast.new(@path).show
	end

	# path = 'http://www.boxofficemojo.com/people/chart/?id=nicolascage.htm'
	# csv_path = '/Users/mzakany/Desktop/'
	
	def build_csv()
		concat_path = "#{@location}/#{@name}.csv"

		CSV.open(concat_path, 'wb') do |csv_line|
					
			headers = ['movie_date', 'title', 'lifetime_gross_sales']
			csv_line << headers

			@cage.each do |cage|
				csv_line << [cage[:movie_date], cage[:title], cage[:life_time_gross]]
			end
		end
	end

end



