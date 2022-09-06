lua require('core.init')

set guifont=SFMono\ NERD\ Font:h13
set clipboard^=unnamed,unnamedplus

if has('unix')
	set thesaurus+=/usr/share/dict/words
endif

autocmd FileType markdown setlocal spell
autocmd FileType javascript setlocal shiftwidth=2 tabstop=2

