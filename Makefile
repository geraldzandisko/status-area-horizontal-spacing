#=============================================================================
EXTENSION=status-area-horizontal-spacing
EXTENSION_BASE=@mathematical.coffee.gmail.com
FILES=metadata.json *.js stylesheet.css schemas
#=============================================================================
default_target: all
.PHONY: clean all zip

clean:
	rm -f $(EXTENSION)$(EXTENSION_BASE).zip $(EXTENSION)$(EXTENSION_BASE)/schemas/gschemas.compiled

# nothing in this target, just make the zip
all:
	@if [ -d $(EXTENSION)$(EXTENSION_BASE)/schemas ]; then \
		glib-compile-schemas $(EXTENSION)$(EXTENSION_BASE)/schemas; \
	fi

zip: all
	(cd $(EXTENSION)$(EXTENSION_BASE); \
		zip -rq ../$(EXTENSION)$(EXTENSION_BASE).zip $(FILES) -x '*.po')
