require 'nokogiri'
require 'open-uri'

module Jekyll
  class PicasaAlbumTag < Liquid::Tag
    def initialize(tag_name, rss_url, token)
      super

      @rss_url = rss_url

      @config = Jekyll.configuration({})['picasa_album'] || {}
      @config['thumbnail_size']  ||= 1;    # 0=small, 1=medium, 2=large
      ##
      @config['gallery_tag']    ||= 'div';
      @config['gallery_class']  ||= '';
      ##      
      @config['title_show']     ||= false
      @config['title_text']     ||= nil
      @config['title_tag']      ||= 'h2';
      ##
      @config['a_rel']          ||= /[0-9]+/.match(rss_url)
      @config['a_class']        ||= '';
      @config['a_target']        ||= '';
      ##
      @config['img_rel']        ||= '';
      @config['img_class']      ||= '';
    end

    def render(context)
      album = fetch_album_data
      html = "<#{@config['gallery_tag']} class=\"#{@config['gallery_class']}\">\n"
      if @config['title_show']
        if  @config['title_text'].nil
          html += "<#{@config['title_tag']}>#{config['title_text']}</#{@config['title_tag']}>\n"
        else 
          html += "<#{@config['title_tag']}>#{album.title}</#{@config['title_tag']}>\n"
        end
      end
      album.photos.each do |photo|
        html += "<a rel=\"#{@config['a_rel']}\" class=\"#{@config['a_class']}\" target=\"#{@config['a_target']}\" href=\"#{photo.url}\">"
        html += "<img rel=\"#{@config['img_rel']}\" class=\"#{@config['img_class']}\" src=\"#{photo.thumbnail}\"/>"
        html += "</a>\n"
      end
      html += "</#{@config['gallery_tag']}>"
      "#{html}"
    end

    def fetch_album_data
      @doc = Nokogiri::XML(open(@rss_url))
      album = PicasaAlbum.new(@config, @doc)
      @doc.xpath("//item").each do |item|
        album.photos << PicasaPhoto.new(@config, item)
      end
      album
    end
  end

  class PicasaAlbum
    attr_accessor :photos
    attr_reader :title, :last_update, :link, :thumbnail
    def initialize(config, node)
      @config = config
      @node = node

      @title = node.xpath("//channel/title").first.content
      @last_update = node.xpath("//channel/lastBuildDate").first.content
      @link = node.xpath("//channel/link").first.content
      @thumbnail = node.xpath("//channel/image/url").first.content

      @photos = Array.new
    end
  end

  class PicasaPhoto
    def initialize(config, node)
      @config = config
      @node = node
    end
    def picasa_link
      return @node.xpath("./link").first.content
    end
    def title
      return @node.xpath("./title").first.content
    end
    def url
      return @node.xpath("./media:group/media:content/@url").first.content
    end
    def description
      return @node.xpath("./media:group/media:description").first.content
    end
    def thumbnail
      return @node.xpath("./media:group/media:thumbnail/@url")[@config['thumbnail_size']].content
    end
  end
end
Liquid::Template.register_tag('picasa_album', Jekyll::PicasaAlbumTag)