require 'mechanize'
require 'date'

class CagedBeast

	def initialize(path)
		@path = path
	end

	def build_first_hash
		agent = Mechanize.new
		agent.get(@path)
		scraped_results = agent.page.parser.css('table tr')
		
		results = []
		stripped = []
		hashed_results = []

		scraped_results.each do |td|
			if td.text.include?('StudioAdjusted')
				break
			else
				results << td.text
			end
		end

		results.each do |line|
			stripped << line
		end


		for i in 2..stripped.length
			x = stripped[i]
			if x.nil?
				next
			end
			formatted_row = {
				movies: x
			}

			hashed_results << formatted_row
		end
		hashed_results
	end

	def build_second_hash
		final_results = []

		build_first_hash.each do |line|

			hash_str = line.to_s
			title = /\\r\\n(?<title>\w[^\\]{0,40})/.match(hash_str).to_s.gsub('\r\n', '')
			date = /(?<month>\d{0,2})\/(?<day>\d{0,2})\/(?<year>\d{2})/.match(hash_str)
			money = /(?<one>\d{0,3}),(?<two>\d{0,3}),(?<three>\d{0,3})/.match(hash_str)
			small_money = /(?<one>\d{0,3}),(?<two>\d{0,3})/.match(hash_str)


			if money.nil?
				formatted_row = {
					movie_date: date.to_s,
					title: title.to_s,
					life_time_gross: small_money.to_s
				}

				final_results << formatted_row

			else
				formatted_row = {
					movie_date: date.to_s,
					title: title.to_s,
					life_time_gross: money.to_s
				}

				final_results << formatted_row

			end
		end
		final_results
	end

	def build_third_hash
		final_results_four_digit_year = []

		build_second_hash.each do |push|
			date_form = push[:movie_date]
			year_match = /(?<month>\d{0,2})\/(?<day>\d{0,2})\/(?<year>\d{2})/.match(date_form.to_s)

			next if year_match.nil?
			
			month = year_match[1]
			day = year_match[2]
			year = year_match[3]

			if year[0].include?('0') || year[0].include?('1')
				year = "#{20}#{year}"
				date = "#{month}/#{day}/#{year}"
			else
				year = "#{19}#{year}"
				date = "#{month}/#{day}/#{year}"
			end
			
			formatted_row = {
					movie_date: Date.strptime(date, '%m/%d/%Y'),
					title: push[:title],
					life_time_gross: push[:life_time_gross].gsub(',','').to_i
				}

				final_results_four_digit_year << formatted_row

		end
		final_results_four_digit_year
	end

	def show
		build_first_hash
		build_second_hash
		build_third_hash
	end

end


