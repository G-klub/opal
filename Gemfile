source 'https://rubygems.org'
gemspec

# Stick with older racc until
# https://github.com/tenderlove/racc/issues/32
# is solved.
gem 'racc', '< 1.4.10' if RUBY_VERSION.to_f < 1.9
gem 'rubysl', :platform => :rbx # Rubinius ERB

group :repl do
  gem 'therubyracer', :require => 'v8', :platform => :mri
  gem 'therubyrhino', :platform => :jruby
end
