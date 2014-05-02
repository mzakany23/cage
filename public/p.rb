path = '/Users/mzakany/Desktop/d3/public'

Dir.glob(path + '/**').each do |line|
	if line.include?('.csv') || line.include?('.CSV')
		
	end
end