# Usage:
# ruby concat.rb /path-to-compass-gem/frameworks/compass/stylesheets/_compass.scss > compass-all.scss

@seen = []

def concat(file)
  File.foreach(file) do |line|
    if line =~ /^\s?@import "(.+?)";/
      import = $1
      unless @seen.include?(import)
        @seen << import
        puts "// IMPORTING #{import}"
        import_filename = import.gsub(%r{([^/]+)$}, '_\1.scss')
        import_path = File.exist?(File.dirname(file) + "/" + import_filename) ? File.dirname(file) : @basedir
        concat("#{import_path}/" + import_filename)
      end
    else
      puts line
    end
  end
end

@basedir = File.dirname(File.expand_path(ARGV[0]))
concat ARGV[0]
