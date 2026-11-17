.PHONY: site

# GitHub Pages serves docs/ from master. The guides and images in docs/ are
# source files; only the site's own index and assets are rebuilt.
site:
	@[ -d site/node_modules ] || (cd site && npm ci)
	rm -rf docs/assets
	cd site && npm run build
